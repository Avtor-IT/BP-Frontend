function areMapsEqual(map1, map2) {
	if (map1.size !== map2.size) return false;

	for (const [key, value] of map1) {
		if (!map2.has(key) || map2.get(key) !== value) {
			return false;
		}
	}

	return true;
}

export default areMapsEqual;
