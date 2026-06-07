const fs = require('fs');
const pagePath = 'a:\\HKD\\frontend\\src\\app\\page.tsx';
const compPath = 'a:\\HKD\\frontend\\src\\components\\UpcomingFestivals.tsx';

const content = fs.readFileSync(pagePath, 'utf8');
const lines = content.split('\n');

// Find the start and end of the Upcoming Festivals section
const startLineIndex = lines.findIndex(line => line.includes('{/* 3. UPCOMING FESTIVALS SECTION */}'));
const endLineIndex = lines.findIndex(line => line.includes('{/* 4. FEATURES SECTION */}'));

if (startLineIndex === -1 || endLineIndex === -1) {
    console.error("Could not find section markers");
    process.exit(1);
}

// Extract the section, ending before the 4. FEATURES SECTION (and before the empty line preceding it)
const sectionLines = lines.slice(startLineIndex, endLineIndex - 1);
const section = sectionLines.join('\n');

const componentContent = `import React from 'react';

export default function UpcomingFestivals() {
  return (
    <>
${section}
    </>
  );
}
`;

fs.writeFileSync(compPath, componentContent);

// Replace the section in page.tsx with the component
const newPageLines = [
    ...lines.slice(0, startLineIndex),
    '      <UpcomingFestivals />',
    ...lines.slice(endLineIndex - 1)
];

let newPageContent = newPageLines.join('\n');

if (!newPageContent.includes("import UpcomingFestivals")) {
    newPageContent = newPageContent.replace(
        "import FeatureCard from '@/components/FeatureCard';", 
        "import FeatureCard from '@/components/FeatureCard';\nimport UpcomingFestivals from '@/components/UpcomingFestivals';"
    );
}

fs.writeFileSync(pagePath, newPageContent);
console.log("Successfully extracted component and updated page.tsx");
