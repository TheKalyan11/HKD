"use client";

import React, { useState, useEffect } from 'react';
import { useCms } from './CmsContext';
import { Pencil } from 'lucide-react';

interface VisualEditableProps {
  pageId: string;
  section: string;
  field: string;
  defaultValue: string;
  className?: string;
  multiline?: boolean;
  element?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
}

export const VisualEditable: React.FC<VisualEditableProps> = ({
  pageId,
  section,
  field,
  defaultValue,
  className = "",
  multiline = false,
  element: Element = 'span'
}) => {
  const { editMode, pageContent, updatePageField } = useCms();
  const [val, setVal] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);

  // Retrieve cached content from the global CMS cache
  const content = pageContent[pageId]?.[section]?.[field];

  useEffect(() => {
    if (content !== undefined) {
      setVal(content);
    }
  }, [content]);

  const handleBlur = () => {
    setIsEditing(false);
    updatePageField(pageId, section, field, val);
  };

  if (!editMode) {
    return <Element className={className}>{val || defaultValue}</Element>;
  }

  if (isEditing) {
    return multiline ? (
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        className={`w-full bg-cream border border-saffron rounded-lg p-2 text-charcoal-900 focus:ring-2 focus:ring-saffron/30 ${className}`}
        rows={4}
      />
    ) : (
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        className={`w-full bg-cream border border-saffron rounded-lg p-1.5 text-charcoal-900 focus:ring-2 focus:ring-saffron/30 ${className}`}
      />
    );
  }

  return (
    <span 
      className={`group relative inline-block cursor-pointer border border-dashed border-saffron/50 hover:bg-saffron/5 p-1 rounded transition-all duration-200 ${className}`}
      onClick={() => setIsEditing(true)}
      title="Click to edit visually"
    >
      {val || defaultValue}
      <span className="absolute -top-2.5 -right-2.5 hidden group-hover:flex items-center justify-center bg-saffron text-white rounded-full w-5 h-5 shadow-md">
        <Pencil className="w-3 h-3" />
      </span>
    </span>
  );
};
