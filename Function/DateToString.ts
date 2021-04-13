export const dateToString = (dateString : string) => {
	const date = new Date(dateString);

	if(!date)
		return "";

	const year = date.getFullYear();
	let month = (date.getMonth()+1).toString();
	let day= date.getDate().toString();

	month = month.length === 1 ? "0" + month : month;
	day = day.length === 1 ? "0" + day : day;

	return (
		"" + year + "/" + month + "/" + day
	);
}