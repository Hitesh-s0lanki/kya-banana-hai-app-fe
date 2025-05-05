type TagProps = {
    text: string;
};

const colorPairs = [
    { bgColor: '#FFEBEE', textColor: '#D32F2F' }, // Light Red with dark red text
    { bgColor: '#E3F2FD', textColor: '#1976D2' }, // Light Blue with dark blue text
    { bgColor: '#E8F5E9', textColor: '#388E3C' }, // Light Green with dark green text
    { bgColor: '#FFF3E0', textColor: '#F57C00' }, // Light Orange with dark orange text
    { bgColor: '#F3E5F5', textColor: '#7B1FA2' }, // Light Purple with dark purple text
    { bgColor: '#FCE4EC', textColor: '#C2185B' }, // Light Pink with dark pink text
    { bgColor: '#E0F7FA', textColor: '#00796B' }, // Light Cyan with dark teal text
    { bgColor: '#EFEBE9', textColor: '#5D4037' }, // Light Brown with dark brown text
];


function getRandomColorPair() {
    return colorPairs[Math.floor(Math.random() * colorPairs.length)];
}

const StyleTag: React.FC<TagProps> = ({ text }) => {
    const { bgColor, textColor } = getRandomColorPair();

    const tagStyles = {
        backgroundColor: bgColor,
        color: textColor,
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        whiteSpace: 'nowrap', // Ensures text doesn't wrap to the next line
    };

    return <span style={tagStyles} className=" block">{text}</span>;
};

export default StyleTag;