export const dateToString = (date : Date) => {
	const year = date.getFullYear();
	let month = date.getMonth().toString();
	let day= date.getDay().toString();

	month = month.length === 1 ? "0" + month : month;
	day = day.length === 1 ? "0" + day : day;

	return (
		"" + year + "/" + month + "/" + day
	);
}