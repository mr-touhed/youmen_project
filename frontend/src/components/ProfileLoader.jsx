import React from 'react'
import ContentLoader from 'react-content-loader'

const ProfileLoader = props => {
  return (
   <div className='flex justify-center items-center mt-14 px-4'>

<ContentLoader 
    speed={1.5}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 400 600"
    backgroundColor="#f3e7e7"
    foregroundColor="#c7cdea"
    {...props}
  >
    <circle cx="200" cy="137" r="134" />
    <rect x="87" y="300" rx="0" ry="0" width="240" height="30" /> 
    <rect x="87" y="380" rx="9" ry="9" width="100" height="25" /> 
    <rect x="219" y="380" rx="9" ry="9" width="100" height="25" /> 
    <circle cx="300" cy="230" r="35" /> 
    <rect x="128" y="340" rx="0" ry="0" width="150" height="24" /> 
    <rect x="5" y="454" rx="0" ry="0" width="429" height="23" /> 
    <rect x="5" y="419" rx="0" ry="0" width="429" height="23" /> 
    <rect x="6" y="525" rx="0" ry="0" width="429" height="28" /> 
    <rect x="5" y="490" rx="0" ry="0" width="429" height="23" />
  </ContentLoader>
   </div>
  )
}

// UserReviewSkype.metadata = {
//   name: 'Pushp Vashisht',
//   github: 'pushp1997',
//   description: 'A User Review with Skype like user image.',
//   filename: 'UserReviewSkype',
// }

export default ProfileLoader