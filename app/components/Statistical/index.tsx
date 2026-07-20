import './Statistical.css'

type ChartHeaderProps = {
    label: string;
    value: string;
    content: string;
}

export default function Statistical({label, value, content}:ChartHeaderProps) {
  return (
    <div className='stat'>
        <p className='label'>{label}</p>
        <p className='content'>
            <span className='value'>{value} </span>
            {content}
        </p>
    </div>
  )
}