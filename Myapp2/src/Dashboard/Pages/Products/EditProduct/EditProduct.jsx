import NavBar from '../../Components/NavBar/NavBar'
import SideBar from '../../Components/SideBar/SideBar'
import './EditProduct.scss'
function EditProduct() {
  return (
    <>
      <div className="new">
        <SideBar />
        <div className="newContainer">
          <NavBar />
          <div className="top">
            <h1> Edit Products</h1>
          </div>
          <form className='cateForm' >
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="description">Descr iption:</label>
            <textarea id="description" name="description"></textarea>

            <label htmlFor="category">Category:</label>
            <select id="category" name="category">
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" step="0.01" required />

            <label htmlFor="stock">Stock:</label>
            <input type="number" id="stock" name="stock" required />

            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>)
}

export default EditProduct