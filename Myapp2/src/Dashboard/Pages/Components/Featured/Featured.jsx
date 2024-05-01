import './Featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text="70%" strokeWidth={5} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">$420</p>
                <p className="desc">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="summary">
                    {summaryItems.map((item, index) => (
                        <div className="item" key={index}>
                            <div className="itemTitle">{item.title}</div>
                            <div className={`itemResult ${item.resultType}`}>
                                {item.resultType === 'negative' ? (
                                    <KeyboardArrowDownIcon fontSize="small" />
                                ) : (
                                    <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                )}
                                <div className="resultAmount">{item.amount}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const summaryItems = [
    { title: 'Target', resultType: 'negative', amount: '$12.4k' },
    { title: 'Last Week', resultType: 'positive', amount: '$12.4k' },
    { title: 'Last Month', resultType: 'positive', amount: '$12.4k' },
];

export default Featured;
