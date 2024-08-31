"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import { useState } from 'react'
import React from 'react'

const isValidAmazonProducURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    //check if hostname contains amazon.com or amazon.ca etc

    if(
      hostname.includes('amazon.com')||
      hostname.includes('amazon.')||
      hostname.endsWith('amazon'))

    {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault(); //default behavior is reload in websites but we dont want that here because we are making an app
      
      const isValidLink = isValidAmazonProducURL(searchPrompt)

      if(!isValidLink) return alert('Please provide a valid Amazon link');

      try {
        setIsLoading(true);

        //scrape the product page
        const product = await scrapeAndStoreProduct(searchPrompt);
      } catch (error){
        console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form className = "flex flex-wrap gap-4 mt-12"
    onSubmit = {handleSubmit}
    >
        <input
        type = "text"
        value = {searchPrompt}
        onChange={(e)=> setSearchPrompt(e.target.value)}
        placeholder='Enter Product link'
        className='searchbar-input'
        />

        <button 
        type = "submit" 
        className='searchbar-btn'
        disabled = {searchPrompt === ''}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>

    </form>
  )
}

export default Searchbar