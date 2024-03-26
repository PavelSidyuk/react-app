import './JournalItem.css';

function JournalItem({title, text, date}) {

	const formatDate = new Intl.DateTimeFormat('ru-Ru').format(date);
	
	return (
		<>
			<h2 className='journa-item__header'>{title}</h2>
			<h2 className='journa-item__dody'>
				<dir className='journa-item__date'>{formatDate}</dir>
				<dir className='journa-item__text'>{text}</dir>
			</h2>
		</>
	);
}

export default JournalItem;