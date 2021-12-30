const useGenres = (selectedGenres)=>{
    if(selectedGenres.length<1) return '';
    const GenreIdS= selectedGenres.map(g=>g.id);
    console.log(selectedGenres.map(g=>g.id))
    return GenreIdS.reduce((acc, curr)=> acc+','+curr);
}
export {useGenres};