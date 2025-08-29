const CustomerInformationForm = () => {
  return (
    <form>
      <div className="formMain">
        <div className="form-group mb-12 prefix">
          <select id="title" name="title" className="form-control">
            <option value="">เลือกคำนำหน้า</option>
            <option value="1">นาย</option>
            <option value="2">นาง</option>
            <option value="3">นางสาว</option>
          </select>
          <label className="form-label" htmlFor="title">
            คำนำหน้า
          </label>
          <div className="feedback">กรุณาเลือก</div>
        </div>
      </div>
    </form>
  )
}

const form = {
  CustomerInformationForm,
}

export default form
