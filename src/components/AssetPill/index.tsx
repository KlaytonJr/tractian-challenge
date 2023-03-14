import "./style.css";

interface Props {
    status: string,
    color: string,
}

function AssetPill({ status, color }: Props) {
  return (
    <div className={`asset-pill ${color}-pill`}>
        <span className="text-white">{ status }</span>
    </div>
  );
}

export default AssetPill;
