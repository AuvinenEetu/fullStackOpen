const Search = ({searchTerm, handleSearchChange}) => {
    return(
    <div>
        search: <input value={searchTerm} onChange={handleSearchChange}/>
    </div>
    )

}


export default Search


