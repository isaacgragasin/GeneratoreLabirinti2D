/**
 * Returns the location of an entry
 * 
 * @param entries the entries of the maze
 * @param type the type of entry, if it's the start or the end
 * @param gate 
 */
function getEntryNode( entries, type, gate = false ) {
	if ( !hasEntries( entries ) ) {
		return false;
	}

	if( 'start' === type ) {
		return gate ? entries.start.gate : {'x': entries.start.x, 'y': entries.start.y};
	}

	if( 'end' === type ) {
		return gate ? entries.end.gate : {'x': entries.end.x, 'y': entries.end.y};
	}

	return false;
}
/**
 * Verifies if the maze actually has entries
 * 
 * @param entries the entries of the maze
 */
function hasEntries( entries ) {
	if ( entries.hasOwnProperty( 'start' ) && entries.hasOwnProperty( 'end' ) ) {
		return true;
	}

	return false;
}