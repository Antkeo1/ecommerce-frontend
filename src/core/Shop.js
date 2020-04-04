import React, {useEffect, useState} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories} from './apiCore'
import CheckBox from './CheckBox'

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    
    //load categories and set form data
      const init = () => {
        // brings in our categories from the backend
        getCategories()
        .then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    //lifecycle method
    useEffect(() => {
        init()
    }, [])

    return (
        <Layout title='Shop Page' description='Search and find items of your choice' className='container-fluid'>
          <div className='row'>
            {/* left sidebar */}
            <div className='col-4'>
                <h4>Filter by categories</h4>
                <ul>
                    <CheckBox categories={categories} />
                </ul>
            </div>

            <div className='col-8'>
                right
            </div>
          </div>
        </Layout>
    ) 
}

export default Shop