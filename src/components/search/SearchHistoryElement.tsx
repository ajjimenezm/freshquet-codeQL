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
            className="flex w-full cursor-default flex-row justify-between pb-2 pt-2 hover:bg-gray-100 active:bg-gray-400"
            onClick={handleClick}
        >
            <div className="ml-2">{props.historyString}</div>
            <div className="mr-2">
                <HistoryIcon />
            </div>
        </div>
    );
}

export default SearchHistoryElement;
