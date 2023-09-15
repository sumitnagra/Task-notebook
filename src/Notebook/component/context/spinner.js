const Spinner=(props)=>{

 return(<>
 <div className={`d-flex justify-content-center ${props.margin}`} >
    <div className={`spinner-border ${props.color}`}  role="status">
  <span className="visually-hidden">Loading...</span>
</div>
</div>
 </>)   
}
export default Spinner