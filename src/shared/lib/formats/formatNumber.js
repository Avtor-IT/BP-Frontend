function formatNumber(number) {
	if (typeof number !== 'number' && typeof number !== 'string') {
		return '';
	}

	// Преобразуем входное значение в строку и убираем всё, кроме цифр
	const numStr = String(number).replace(/\D/g, '');

	// Добавляем пробелы каждые три символа с конца
	return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default formatNumber;
