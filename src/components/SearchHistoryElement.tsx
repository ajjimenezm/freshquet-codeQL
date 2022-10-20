import HistoryIcon from "@mui/icons-material/History";

interface SearchHistoryElementProps {
    historyString: string;
    onHistoryClick: (historyString: string) => void;
}

function SearchHistoryElement(props: SearchHistoryElementProps) {
    const handleClick = () => {
        props.onHistoryClick(props.historyString);
    };
    return (
        <div
            className="mb-2 flex flex-row justify-between pt-2"
            onClick={handleClick}
        >
            <div>{props.historyString}</div>
            <div>
                <HistoryIcon />
            </div>
        </div>
    );
}

export default SearchHistoryElement;
