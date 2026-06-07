const fs = require('fs');
const file = 'a:\\HKD\\frontend\\src\\components\\UpcomingFestivals.tsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const startLine = lines.findIndex(l => l.includes('{/* Bottom Button - Matching Screenshot */}'));
const endLine = lines.findIndex(l => l.includes('{/* Bottom decorative pattern overlay */}'));

if (startLine !== -1 && endLine !== -1) {
    // We want to keep the closing </div> for the container mx-auto px-6
    // It should be right before the '{/* Bottom decorative pattern overlay */}' comment.
    // Let's just look backwards from endLine to find it.
    let closeDivIdx = -1;
    for (let i = endLine - 1; i > startLine; i--) {
        if (lines[i].includes('</div>')) {
            closeDivIdx = i;
            break;
        }
    }
    
    // Now we remove from startLine up to closeDivIdx - 1.
    if (closeDivIdx !== -1) {
        lines.splice(startLine, closeDivIdx - startLine);
        fs.writeFileSync(file, lines.join('\n'));
        console.log("Successfully removed button");
    } else {
        console.log("Could not find closing div");
    }
} else {
    console.log("Could not find markers");
}
