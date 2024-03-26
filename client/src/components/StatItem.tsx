import Wrapper from "../assets/wrappers/StatItem";

type StatItemType = {
    count: number;
    title: string;
    icon: React.ReactNode;
    color: string;
    bcg: string;
};

const StatItem: React.FC<StatItemType> = ({
    count,
    title,
    icon,
    color,
    bcg,
}) => {
    return (
        <Wrapper color={color} theme={bcg}>
            <header>
                <span className="count">{count}</span>
                <span className="icon">{icon}</span>
            </header>
            <h5 className="title">{title}</h5>
        </Wrapper>
    );
};
export default StatItem;
