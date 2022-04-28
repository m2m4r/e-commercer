const SubmitBtn = ({clase , valor})=>{
    return (
        <input
            id="margen"
            type="submit"
            className={clase}
            value={valor}
        />
    )
}
export default SubmitBtn