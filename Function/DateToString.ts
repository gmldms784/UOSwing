export const dateToString = (date : Date) => {
	const year = date.getUTCFullYear();
	let month = (date.getUTCMonth()+1).toString();
	let day= date.getUTCDate().toString();

	month = month.length === 1 ? "0" + month : month;
	day = day.length === 1 ? "0" + day : day;

	return (
		"" + year + "/" + month + "/" + day
	);
}