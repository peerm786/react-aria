import { useCallback, useEffect, useState } from "react";
import { RenderObject } from "./renderingComponents";
import _ from "lodash";

export const RenderJson = ({ json, functionality }: any) => {
  const [dupJson, setDupJson] = useState<null | any>(null);
  const [convertedJson, setConvertedJson] = useState<null | any>(null);

  function unflattenJson(flatJson: any) {
    function setNestedItem(obj: any, keys: any[], value: any) {
      keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
          acc[key] = value;
        } else {
          if (!acc[key]) {
            acc[key] = {};
          }
          return acc[key];
        }
      }, obj);
    }

    const unflattened = {};

    for (const [key, value] of Object.entries(flatJson)) {
      const keys = key.split("/");
      setNestedItem(unflattened, keys, value);
    }

    return unflattened;
  }

  const OgJson = useCallback(() => {
    const newjs: any = unflattenJson(dupJson);
    setConvertedJson(newjs);
    functionality(newjs["root"]);
  }, [dupJson]);

  const handlejs = (e: any, i: any, key: any, type: any, jskey: any) => {
    if (type == "obj") {
      setDupJson((prev: any) => {
        const newJson = structuredClone(prev);
        return {
          ...newJson,
          [i]: {
            ...newJson[i],
            [key]: e,
          },
        };
      });
    }

    if (type == "arr-0" || type == "arr-1" || type == "arr") {
      if (i) {
        const js = structuredClone(dupJson);
        _.set(js, i, e);
        setDupJson(js);
      }
    }

    if (type == "dropdown" || type == "boolean") {
      if (i) {
        const js = structuredClone(dupJson);
        _.set(js, i, e);
        setDupJson(js);
      }
    }
  };

  const handleAddjs = (
    path: any,
    key: any,
    value: any,
    type: any,
    i: any,
    selectedType: any
  ) => {
    if (type == "obj" && selectedType === "input") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: {
            ...prev[path],
            [key]: value,
          },
        };
      });
    } else if (type == "obj" && selectedType === "boolean") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: {
            ...prev[path],
            [key]: {
              label: key,
              type: "boolean",
              selectedValue: false,
              selectionList: [true, false],
            },
          },
        };
      });
    } else if (type == "obj" && selectedType === "dropdown") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: {
            ...prev[path],
            [key]: {
              label: key,
              type: "dropdown",
              selectedValue: "",
              selectionList: value,
            },
          },
        };
      });
    } else if (type === "arr-1" && selectedType === "input") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: prev[path].map((item: any, index: number) => {
            if (index === i) {
              return {
                ...item,
                [key]: value,
              };
            } else {
              return item;
            }
          }),
        };
      });
    } else if (type === "arr-1" && selectedType === "boolean") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: prev[path].map((item: any, index: number) => {
            if (index === i) {
              return {
                ...item,
                [key]: {
                  label: key,
                  type: "boolean",
                  selectedValue: false,
                  selectionList: [true, false],
                },
              };
            } else {
              return item;
            }
          }),
        };
      });
    } else if (type == "arr-1" && selectedType === "dropdown") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: prev[path].map((item: any, index: number) => {
            if (index === i) {
              return {
                ...item,
                [key]: {
                  label: key,
                  type: "dropdown",
                  selectedValue: "",
                  selectionList: value,
                },
              };
            } else {
              return item;
            }
          }),
        };
      });
    } else if (type === "arr-0" && selectedType === "object") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: [
            ...prev[path],
            {
              label: key,
            },
          ],
        };
      });
    }
  };
  const handleDeletejs = (path: any, type: any, label: any) => {
    if (type === "arr-1") {
      setDupJson((prev: any) => {
        const updatedObj = _.cloneDeep(prev);
        const events = _.get(updatedObj, path);
        _.remove(events, (event: any) => event.label === label);
        return updatedObj;
      });
    } else if (type === "obj") {
      const js = _.cloneDeep(dupJson);
      _.unset(js, path);
      setDupJson(js);
    } else {
      const js = dupJson;
      const pathsToDelete = Object.keys(js).filter(
        (key) => key == path || key.startsWith(path + "/")
      );
      pathsToDelete.forEach((key) => {
        _.unset(js, key);
      });
      setDupJson(js);
    }
  };
  function denormalizeJson(
    obj: any,
    prefix = "",
    result: any = {},
    originalObj?: any
  ) {
    const copy = JSON.parse(JSON.stringify(obj));
    for (let key in copy) {
      if (copy.hasOwnProperty(key)) {
        if (key === "root") {
          Object.keys(copy).forEach((key) => {
            if (
              typeof copy[key] !== "object" ||
              copy[key].hasOwnProperty("type")
            ) {
              result[key] = copy[key];
            }
          });
        }
        let newKey = prefix ? `${prefix}/${key}` : key;
        if (
          typeof copy[key] === "object" &&
          copy[key] !== null &&
          !Array.isArray(copy[key])
        ) {
          if (
            !(
              copy[key].hasOwnProperty("type") &&
              (copy[key].type === "dropdown" || copy[key].type === "boolean")
            )
          ) {
            if (copy[key] === originalObj) {
              return result; // Return early if the object being processed is the same as the original object
            }
            result[newKey] = copy[key];
            denormalizeJson(copy[key], newKey, result, originalObj);
            delete copy[key];
          }
        } else if (
          Array.isArray(copy[key]) &&
          typeof copy[key][0] === "object"
        ) {
          result[newKey] = copy[key];
          copy[key].forEach((item: any, index: number) => {
            if (typeof item === "object" && item !== null) {
              const nestedKey = `${newKey}/${index}`;
              denormalizeJson(item, nestedKey, result, originalObj);
            } else {
              result[newKey][index] = item;
            }
          });
          delete copy[key];
        } else {
          if (!prefix && key !== "root") {
            result[copy["label"]] = copy;
          }
        }
      }
    }
    return result;
  }

  const haandledenormalize = () => {
    if (json) {
      const denormalized = denormalizeJson({ root: json });
      setDupJson(structuredClone(denormalized));
    }
  };

  useEffect(() => {
    haandledenormalize();
  }, [json]);

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide -ml-4">
      {dupJson && Object.keys(dupJson).length > 0 && (
        <div className="h-full overflow-y-scroll scrollbar-hide ">
          {
            <>
              <RenderObject
                obj={dupJson}
                handlejs={handlejs}
                OgJson={OgJson}
                setDupJson={setDupJson}
                handleAddjs={handleAddjs}
                handleDeletejs={handleDeletejs}
              />
            </>
          }
        </div>
      )}
    </div>
  );
};
