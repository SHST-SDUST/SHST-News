import styles from "./index.module.scss";

interface Props {
    color?: string;
    title?: string;
    inheritColor?: boolean;
    titleHeight?: number;
    extra?: JSX.Element | null;
    content: JSX.Element | null;
}

const Card: React.FC<Props> = props => {
    return (
        <>
            <div className={styles["card-container"]}>
                <div>
                    {props.title && (
                        <div className={styles["title-container"]}>
                            <div
                                className={styles["title-vertical-line"]}
                                style={{
                                    borderColor: props.color,
                                    height: props.titleHeight ? props.titleHeight + "px" : "auto",
                                }}
                            >
                                {props.title}
                            </div>
                            {props.extra}
                        </div>
                    )}
                </div>
                <div className={styles.content}>{props.content}</div>
            </div>
        </>
    );
};

Card.defaultProps = {
    color: "#79B2F9",
    titleHeight: 0,
};

export default Card;
