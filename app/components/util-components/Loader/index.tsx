import style from "./index.module.css";
interface Props {
  scale?: number;
}

export const Loader = ({ scale = 1 }: Props) => {
  return (
    <div className={style.loader} style={{ scale: scale.toString() }}></div>
  );
};
