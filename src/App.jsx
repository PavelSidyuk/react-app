import './App.css';
//import Button from './Components/Button/Button';
import CardButton from './Components/CardButton/CardButton';
import JournalItem from './Components/JournalItem/JournalItem';
import LeftPanel from './loyout/LeftPanel/LeftPanel';
import Body from './loyout/Body/Body';
import Header from './Components/Header/Header';
import JournalList from './Components/JournalList/JournalList';
import JournalAddButton from './Components/JournalAddButton/JournalAddButton';
import JornalForm from './Components/JornalForm/JornalForm';
import {useEffect, useState} from 'react';


// const INITIAL_DATA = [
// 	{
// 		id: 1,
// 		title: 'Подготовка к обновлению курсов',
// 		text: 'Горные походы открывают удивительные природные ландшафты',
// 		date: new Date()
// 	},
// 	{
// 		id: 2,
// 		title: 'Поход в годы',
// 		text: 'Думал, что очень много времени',
// 		date: new Date()
// 	}
// ];
// [{
// 	"id": 1,
// 	"title": "Подготовка к обновлению курсов",
// 	"text": "Горные походы открывают удивительные природные ландшафты",
// 	"date": "2024/03/03"
// }]
function App() {

	const [items, setItems] = useState([]);


	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));

		if (data) {
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);
	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			text: item.text,
			title: item.title,
			date: new Date(item.date)

		}]);
	};

	const sortItem = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};


	return (
		<div className="app">

			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					{items.sort(sortItem).map(el => (
						<CardButton key={el.id}>
							<JournalItem
								title={el.title}
								text={el.text}
								date={el.date}
							/>
						</CardButton>
					))}

				</JournalList>
			</LeftPanel>
			<Body>
				<JornalForm onSubmit={addItem}/>
			</Body>
		</div>
	);
}

export default App;
