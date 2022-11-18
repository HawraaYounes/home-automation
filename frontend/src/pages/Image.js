let id=JSON.stringify(localStorage.getItem('albumID')).replace(/\\/g, "");;
function Image() {
  
    return (
      <div>
        <h3>---------------------------------------------------------------{id}</h3>
        {console.log({id})}
      </div>
    );
  }
export default Image