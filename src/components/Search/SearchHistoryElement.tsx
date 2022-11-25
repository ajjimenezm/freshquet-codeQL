import { ReactComponent as HistoryIcon } from "../../assets/icons/ClockIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/CloseIcon.svg";

interface SearchHistoryElementProps {
    historyString: string;
    onHistoryClick: (historyString: string) => void;
    onDeleteEntryClick: (historyString: string) => void;
}

function SearchHistoryElement(props: SearchHistoryElementProps) {
    const handleClick = () => {
        props.onHistoryClick(props.historyString);
    };
    const handleDelete = () => {
        props.onDeleteEntryClick(props.historyString);
    };
    return (
        <div className="flex w-full cursor-default select-none flex-row items-center justify-between pb-4">
            <div
                className="flex grow flex-row items-center"
                onClick={handleClick}
            >
                <HistoryIcon className="h-3.5 w-3.5 stroke-fresh-morado" />
                <div className="ml-3 font-outfit text-sm font-light text-fresh-morado">
                    {props.historyString}
                </div>
            </div>
            <div>
                <DeleteIcon
                    className="h-2.5 w-2.5 stroke-fresh-morado stroke-0"
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
}

export default SearchHistoryElement;
