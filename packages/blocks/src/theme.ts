import * as Blockly from 'blockly';

// Scratch 3 palette: primary fill, secondary (inner fields), tertiary (border).
const styles = {
    event_blocks: { colourPrimary: '#FFBF00', colourSecondary: '#E6AC00', colourTertiary: '#CC9900' },
    logic_blocks: { colourPrimary: '#FFAB19', colourSecondary: '#EC9C13', colourTertiary: '#CF8B17' },
    math_blocks: { colourPrimary: '#59C059', colourSecondary: '#46B946', colourTertiary: '#389438' },
    text_blocks: { colourPrimary: '#9966FF', colourSecondary: '#855CD6', colourTertiary: '#774DCB' },
    arduino_blocks: { colourPrimary: '#0FBD8C', colourSecondary: '#0DA57A', colourTertiary: '#0B8E69' },
};

// Category styles reuse the block primaries so toolbox and blocks stay in sync.
const categoryStyles = Object.fromEntries(
    Object.entries(styles).map(([name, s]) => [name.replace('_blocks', '_category'), { colour: s.colourPrimary }]),
);

export const theme = Blockly.Theme.defineTheme('thingblock', {
    name: 'thingblock',
    base: Blockly.Themes.Classic,
    blockStyles: styles,
    categoryStyles,
    startHats: true,
    componentStyles: {
        toolboxBackgroundColour: '#fff',
        toolboxForegroundColour: '#555',
        flyoutBackgroundColour: '#eee',
        flyoutForegroundColour: '#555',
        flyoutOpacity: 0.5,
        scrollbarOpacity: 0.5
    },
    fontStyle: {
        weight: 'normal',
        size: 12
    }
});

