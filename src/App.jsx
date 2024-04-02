import './App.css';
//import Button from './Components/Button/Button';
import LeftPanel from './loyout/LeftPanel/LeftPanel';
import Body from './loyout/Body/Body';
import Header from './Components/Header/Header';
import JournalList from './Components/JournalList/JournalList';
import JournalAddButton from './Components/JournalAddButton/JournalAddButton';
import JornalForm from './Components/JornalForm/JornalForm';
import {useEffect, useState} from 'react';
import {UserContextProvider} from './Context/user.context.jsx';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => (
		{
			...i,
			date: new Date(i.date)
		}
	));
}

function App() {

	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);

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
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}

	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};


	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items={mapItems(items)} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JornalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);

}

export default App;
