"use client";

import { useEffect, useState, useCallback } from 'react';

type MenuItem = { id: number; name: string; description: string | null; price: string | null; image: string | null; sortOrder: number; sectionId: number };
type MenuSection = { id: number; title: string; notes: string[] | null; sortOrder: number; items: MenuItem[]; subsections: MenuSection[] };

export default function AdminMenuPage() {
    const [sections, setSections] = useState<MenuSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [newItem, setNewItem] = useState<{ sectionId: number } | null>(null);

    const fetchMenu = useCallback(async () => {
        setLoading(true);
        const res = await fetch('/api/admin/menu');
        setSections(await res.json());
        setLoading(false);
    }, []);

    useEffect(() => { fetchMenu(); }, [fetchMenu]);

    const saveItem = async (item: Partial<MenuItem> & { sectionId: number }) => {
        if (item.id) {
            await fetch(`/api/admin/menu-items/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
        } else {
            await fetch('/api/admin/menu-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
        }
        setEditingItem(null);
        setNewItem(null);
        fetchMenu();
    };

    const deleteItem = async (id: number) => {
        if (!confirm('Supprimer cet élément ?')) return;
        await fetch(`/api/admin/menu-items/${id}`, { method: 'DELETE' });
        fetchMenu();
    };

    if (loading) return <p style={{ color: '#888' }}>Chargement…</p>;

    return (
        <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#3a2819' }}>Gestion du Menu</h1>

            {sections.map((section) => (
                <div key={section.id} style={{ background: '#fff', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#b86a2c', marginBottom: '1rem' }}>{section.title}</h2>

                    {section.notes && section.notes.length > 0 && (
                        <p style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic', marginBottom: '0.75rem' }}>{section.notes.join(' · ')}</p>
                    )}

                    <ItemList items={section.items} sectionId={section.id} editingItem={editingItem} setEditingItem={setEditingItem} saveItem={saveItem} deleteItem={deleteItem} newItem={newItem} setNewItem={setNewItem} />

                    {section.subsections.map((sub) => (
                        <div key={sub.id} className="admin-subsection-card" style={{ marginLeft: '1.5rem', marginTop: '1rem', paddingLeft: '1rem', borderLeft: '2px solid #f0e6d4' }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#3a2819', marginBottom: '0.75rem' }}>{sub.title}</h3>
                            <ItemList items={sub.items} sectionId={sub.id} editingItem={editingItem} setEditingItem={setEditingItem} saveItem={saveItem} deleteItem={deleteItem} newItem={newItem} setNewItem={setNewItem} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function ItemList({ items, sectionId, editingItem, setEditingItem, saveItem, deleteItem, newItem, setNewItem }: {
    items: MenuItem[];
    sectionId: number;
    editingItem: MenuItem | null;
    setEditingItem: (item: MenuItem | null) => void;
    saveItem: (item: Partial<MenuItem> & { sectionId: number }) => void;
    deleteItem: (id: number) => void;
    newItem: { sectionId: number } | null;
    setNewItem: (item: { sectionId: number } | null) => void;
}) {
    return (
        <div>
            {items.map((item) => (
                editingItem?.id === item.id ? (
                    <ItemForm key={item.id} item={item} sectionId={sectionId} onSave={saveItem} onCancel={() => setEditingItem(null)} />
                ) : (
                    <div key={item.id} className="admin-menu-itemRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f5f5f5', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div>
                            <strong style={{ fontSize: '0.875rem' }}>{item.name}</strong>
                            {item.price && <span style={{ marginLeft: '0.75rem', color: '#b86a2c', fontSize: '0.8rem' }}>{item.price}</span>}
                            {item.description && <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.125rem' }}>{item.description}</p>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
                            <button onClick={() => setEditingItem(item)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#e8f0fe', color: '#1a73e8', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Modifier</button>
                            <button onClick={() => deleteItem(item.id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#fce8e6', color: '#d93025', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Suppr.</button>
                        </div>
                    </div>
                )
            ))}

            {newItem?.sectionId === sectionId ? (
                <ItemForm sectionId={sectionId} onSave={saveItem} onCancel={() => setNewItem(null)} />
            ) : (
                <button onClick={() => setNewItem({ sectionId })} style={{ marginTop: '0.5rem', padding: '0.375rem 0.75rem', fontSize: '0.8rem', background: '#f0f0f0', color: '#555', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                    + Ajouter un plat
                </button>
            )}
        </div>
    );
}

function ItemForm({ item, sectionId, onSave, onCancel }: {
    item?: MenuItem;
    sectionId: number;
    onSave: (item: Partial<MenuItem> & { sectionId: number }) => void;
    onCancel: () => void;
}) {
    const [name, setName] = useState(item?.name || '');
    const [description, setDescription] = useState(item?.description || '');
    const [price, setPrice] = useState(item?.price || '');
    const [image, setImage] = useState(item?.image || '');

    const inputStyle = { width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.375rem', fontSize: '0.85rem', boxSizing: 'border-box' as const, marginBottom: '0.5rem' };

    return (
        <div style={{ padding: '0.75rem', background: '#fafafa', borderRadius: '0.5rem', margin: '0.5rem 0' }}>
            <input placeholder="Nom du plat" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
            <div className="admin-itemForm-twoCols" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input placeholder="Prix (ex: 25.00 CHF)" value={price} onChange={(e) => setPrice(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <input placeholder="URL image" value={image} onChange={(e) => setImage(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                <button onClick={() => onSave({ id: item?.id, name, description: description || null, price: price || null, image: image || null, sectionId, sortOrder: item?.sortOrder ?? 0 })} style={{ padding: '0.375rem 0.75rem', fontSize: '0.8rem', background: '#b86a2c', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                    Enregistrer
                </button>
                <button onClick={onCancel} style={{ padding: '0.375rem 0.75rem', fontSize: '0.8rem', background: '#eee', color: '#555', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                    Annuler
                </button>
            </div>
        </div>
    );
}
