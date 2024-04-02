import './JournalList.css';
import JournalItem from '../JournalItem/JournalItem.jsx';
import CardButton from '../CardButton/CardButton.jsx';
import {useContext, useMemo} from 'react';
import {UserContext} from '../../Context/user.context.jsx';

function JournalList({items, setItem}) {
	const {userId} = useContext(UserContext);
	const sortItem = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	const filteredItems = useMemo(() => items.filter(el => el.userId === userId).sort(sortItem),
		[items, userId]);

	return (
		<>
			{
				filteredItems.map(el => (
					<CardButton key={el.id} onClick={() => setItem(el)}>
						<JournalItem
							title={el.title}
							text={el.text}
							date={el.date}
						/>
					</CardButton>
				))
			}
		</>

	);
}

export default JournalList;