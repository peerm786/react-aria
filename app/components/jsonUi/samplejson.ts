export const sample = {
  label: "Organization Group List",
  orgGrp: [
    {
      label: "Organization Group",
      orgGrpName: "fintech",
      orgGrpCode: "FT",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: "A",
        selectionList: ["A", "E"],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: ["FTO1", "FTO2"],
        selectionList: ["*", "FTO1", "FTO2"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: ["*"],
        selectionList: ["*", "FTO1", "FTO2"],
      },
      org: [
        {
          label: "Organization",
          orgCode: "FTO1",
          orgName: "dev",
          roleGrp: [
            {
              label: "Role Group",
              roleGrpCode: "RG1",
              roleGrpName: "developer",
              SIFlag: {
                label: "SI Flag",
                type: "dropdown",
                selectedValue: "A",
                selectionList: ["A", "E"],
              },
              actionAllowed: {
                label: "Allowed Actions",
                type: "dropdown",
                selectedValue: "R1",
                selectionList: ["*", "R1", "R2"],
              },
              actionDenied: {
                label: "Denied Actions",
                type: "dropdown",
                selectedValue: ["*"],
                selectionList: ["*", "R1", "R2"],
              },
              roles: [
                {
                  label: "Role",
                  roleCode: "R1",
                  roleName: "seniordev",
                  users: ["test", "gsk"],
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                    {
                                      name: "mvp",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "logs",
                                  "fabrics",
                                  "setups",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "logs",
                                  "fabrics",
                                  "setups",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "Torus Modeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Role",
                  roleCode: "R2",
                  roleName: "juniordev",
                  users: ["peer", "gsk"],
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "E",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                            },
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSENTERPRISE",
                      psGrpName: "Torus Enterprise",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Organization",
          orgCode: "FTO2",
          orgName: "test",
          roleGrp: [
            {
              label: "Role Group",
              roleGrpCode: "RG2",
              roleGrpName: "Tester",
              SIFlag: {
                label: "SI Flag",
                type: "dropdown",
                selectedValue: "A",
                selectionList: ["A", "E"],
              },
              actionAllowed: {
                label: "Allowed Actions",
                type: "dropdown",
                selectedValue: "R1",
                selectionList: ["*", "R1", "R2", "R3"],
              },
              actionDenied: {
                label: "Denied Actions",
                type: "dropdown",
                selectedValue: ["*"],
                selectionList: ["*", "R1", "R2", "R3"],
              },
              roles: [
                {
                  label: "Role",
                  roleCode: "R1",
                  roleName: "seniortester",
                  users: ["test", "peer"],
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Role",
                  roleCode: "R2",
                  roleName: "juniortester",
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Role Group",
                  roleCode: "R3",
                  roleName: "TorusAdmin",
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Organization Group",
      orgGrpName: "insuretech",
      orgGrpCode: "IT",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: "A",
        selectionList: ["A", "E"],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: "ITO1",
        selectionList: ["*", "ITO1", "ITO2"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: ["*"],
        selectionList: ["*", "ITO1", "ITO2"],
      },
      org: [
        {
          label: "Organization",
          orgCode: "ITO1",
          orgName: "dev",
          roleGrp: [
            {
              label: "Role Group",
              roleGrpCode: "RG1",
              roleGrpName: "developer",
              SIFlag: {
                label: "SI Flag",
                type: "dropdown",
                selectedValue: "A",
                selectionList: ["A", "E"],
              },
              actionAllowed: {
                label: "Allowed Actions",
                type: "dropdown",
                selectedValue: "R1",
                selectionList: ["*", "R1", "R2"],
              },
              actionDenied: {
                label: "Denied Actions",
                type: "dropdown",
                selectedValue: ["*"],
                selectionList: ["*", "R1", "R2"],
              },
              roles: [
                {
                  label: "Role",
                  roleCode: "R1",
                  roleName: "seniordev",
                  users: ["Selva", "sekarponniah"],
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Role",
                  roleCode: "R2",
                  roleName: "juniordev",
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Organization",
          orgCode: "ITO2",
          orgName: "test",
          roleGrp: [
            {
              label: "Role Group",
              roleGrpCode: "RG2",
              roleGrpName: "Tester",
              SIFlag: {
                label: "SI Flag",
                type: "dropdown",
                selectedValue: "A",
                selectionList: ["A", "E"],
              },
              actionAllowed: {
                label: "Allowed Actions",
                type: "dropdown",
                selectedValue: "R1",
                selectionList: ["*", "R1", "R2", "R3"],
              },
              actionDenied: {
                label: "Denied Actions",
                type: "dropdown",
                selectedValue: ["*"],
                selectionList: ["*", "R1", "R2", "R3"],
              },
              roles: [
                {
                  label: "Role",
                  roleCode: "R1",
                  roleName: "seniortester",
                  users: ["gsk", "test"],
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Role",
                  roleCode: "R2",
                  roleName: "juniortester",
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Role",
                  roleCode: "R3",
                  roleName: "TorusAdmin",
                  psGrp: [
                    {
                      label: "Product/Service Group",
                      psGrpCode: "TORUSSME",
                      psGrpName: "TORUS SME",
                      SIFlag: {
                        label: "SI Flag",
                        type: "dropdown",
                        selectedValue: "A",
                        selectionList: ["A", "E"],
                      },
                      actionAllowed: {
                        label: "Allowed Actions",
                        type: "dropdown",
                        selectedValue: "PORTAL",
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      actionDenied: {
                        label: "Denied Actions",
                        type: "dropdown",
                        selectedValue: ["*"],
                        selectionList: ["*", "PORTAL", "MODELER"],
                      },
                      ps: [
                        {
                          label: "Product/Service",
                          psCode: "PORTAL",
                          psName: "TorusPortal",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              label: "Static Menu",
                              resourceType: "StaticMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: [
                                  "*",
                                  "fabrics",
                                  "setups",
                                  "logs",
                                ],
                              },
                            },
                            {
                              label: "UserSpecificMenu",
                              resourceType: "UserSpecificMenu",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                              actionDenied: {
                                label: "Denied Actions",
                                type: "dropdown",
                                selectedValue: ["*"],
                                selectionList: ["*", "Delegates", "KPI"],
                              },
                            },
                            {
                              label: "Code Generation",
                              resourceType: "CG",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                        {
                          label: "Product/Service",
                          psCode: "MODELER",
                          psName: "TorusModeler",
                          tenants: [
                            {
                              name: "ABC",
                              appGrp: [
                                {
                                  name: "MSP",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "CG",
                                  app: [
                                    {
                                      name: "ME",
                                    },
                                  ],
                                },
                                {
                                  name: "TM",
                                  app: [
                                    {
                                      name: "test",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              name: "GSS",
                              appGrp: [
                                {
                                  name: "NewAppGroup",
                                  app: [
                                    {
                                      name: "newAPp",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          portal: [
                            {
                              resourceType: "TorusModeler",
                              resource: "",
                              SIFlag: {
                                label: "SI Flag",
                                type: "dropdown",
                                selectedValue: "A",
                                selectionList: ["A", "E"],
                              },
                              actionAllowed: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["Y"],
                                selectionList: ["Y", "N"],
                              },
                              actionDenied: {
                                label: "Allowed Actions",
                                type: "dropdown",
                                selectedValue: ["N"],
                                selectionList: ["Y", "N"],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
