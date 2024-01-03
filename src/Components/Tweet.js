import React from 'react'

const Tweet = ({tweetData}) => {
  return (
    <div className=' border border-black'  >
        <h2>{tweetData.title}</h2>
        <img src={tweetData.imageURL} alt="" className='w-60' />
    </div>
  )
}

export default Tweet