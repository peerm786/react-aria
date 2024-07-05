"use client"
import React, { useState } from 'react';
import { Cell, Column, Row, Table, TableBody, TableHeader, type Selection, type TableProps } from 'react-aria-components';

interface Pokemon {
    id: number;
    name: string;
    age: string;
    place: string;
}

interface PokemonTableProps extends TableProps {
    items?: Pokemon[];
    renderEmptyState?: () => string;
}

function PokemonTable(props: PokemonTableProps) {
    const [items, setItems] = useState<Pokemon[]>(props.items || [
        { id: 1, name: 'Charizard', age: 'Fire, Flying', level: '67' },
        { id: 2, name: 'Blastoise', age: 'Water', level: '56' },
        { id: 3, name: 'Venusaur', age: 'Grass, Poison', level: '83' },
        { id: 4, name: 'Pikachu', age: 'Electric', place: '100' }
    ]);

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
    const [newItem, setNewItem] = useState<Pokemon>({ id: 0, name: '', type: '', level: '' });

    const add = () => {
        setItems([...items, { ...newItem, id: items.length + 1 }]);
        setNewItem({ id: 0, name: '', Age: '', place: '' });
    };

    const deleterow = () => {
        setItems(items.filter(item => !selectedKeys.has(item.id.toString())));
        setSelectedKeys(new Set());
    };

    const updateItem = (id: number, updatedItem: Partial<Pokemon>) => {
        setItems(items.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
    };

    return (
        <div>
            <Table
                aria-label="Pokemon table"
                {...props}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                className="min-w-full bg-white border border-gray-300"
            >
                <TableHeader className="bg-gray-200">
                    <Column isRowHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</Column>
                    <Column isRowHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</Column>
                    <Column className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</Column>
                    <Column className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</Column>
                </TableHeader>
                <TableBody items={items} renderEmptyState={props.renderEmptyState}>
                    {item => (
                        <Row key={item.id} className="bg-white border-b hover:bg-gray-50">
                            <Cell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</Cell>
                            <Cell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={e => updateItem(item.id, { name: e.target.value })}
                                    className="w-full bg-transparent outline-none"
                                />
                            </Cell>
                            <Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input
                                    type="text"
                                    value={item.type}
                                    onChange={e => updateItem(item.id, { type: e.target.value })}
                                    className="w-full bg-transparent outline-none"
                                />
                            </Cell>
                            <Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input
                                    type="text"
                                    value={item.level}
                                    onChange={e => updateItem(item.id, { level: e.target.value })}
                                    className="w-full bg-transparent outline-none"
                                />
                            </Cell>
                        </Row>
                    )}
                </TableBody>
            </Table>

            <div className="mt-4 flex space-x-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                    className="border px-2 py-1"
                />
                <input
                    type="text"
                    placeholder="Type"
                    value={newItem.type}
                    onChange={e => setNewItem({ ...newItem, type: e.target.value })}
                    className="border px-2 py-1"
                />
                <input
                    type="text"
                    placeholder="Level"
                    value={newItem.level}
                    onChange={e => setNewItem({ ...newItem, level: e.target.value })}
                    className="border px-2 py-1"
                />
                <button onClick={add} className="">Add</button>
                {/* <button onClick={deleterow} className="bg-red-500 text-white px-4 py-2">Delete</button> */}
            </div>
        </div>
    );
}

export default PokemonTable;

