import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetchUser } from "../../utils/useApis/useUserApis/useFetchUsers"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/LoadingSpinner"
import { useEditUser } from "../../utils/useApis/useUserApis/useEditUser"
import toast from "react-hot-toast"

const EditUser = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {data:userData, isLoading} = useFetchUser(id)

    const {editUser, isEditing} = useEditUser()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [About, setAbout] = useState('')

    useEffect(() => {
        console.log(userData)
        if (userData?.user) {
          const user = userData.user;
          setFirstName(user?.firstName || '');
          setLastName(user?.lastName || '');
          setPhoneNumber(user?.phoneNumber || '');
          setGender(user?.gender || '');
          setBusinessName(user?.businessDetails?.businessName || '');
          setAddress(user?.businessDetails?.address || '');
          setState(user?.businessDetails?.state || '');
          setCity(user?.businessDetails?.city || '');
          setAbout(user?.businessDetails?.businessInformation|| '');
        }
      }, [userData]);

      const handleSave = async()=>{
        if(!firstName || !lastName || !gender) return toast.error('First name, last name and gender required')

        await editUser(id, {
            firstName,
            lastName,
            gender,
            phoneNumber,
            businessName,
            businessInformation: About,
            state,
            city,
            address
        })

        navigate('/users')
      }

    if(isLoading) return <LoadingSpinner/>

    return (
        <div className='mt-7 mb-5 flex flex-col gap-7'>
            <div className='flex gap-2 items-center'>
                <ArrowLeft onClick={()=>{navigate(-1)}} color='#FE7A36' size={32}/>
                <p className='text-3xl font-bold text-[#202224]'>Edit user profile</p>
            </div>

            <div className="flex flex-col gap-8">
                <h3 className="font-semibold text-[#3652AD] text-lg">Personal details</h3>

                <div className="flex items-center gap-8 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">First name</label>

                        <input 
                            type='text'
                            placeholder='Enter First Name'
                            className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">Last name</label>

                        <input 
                            type='text'
                            placeholder='Enter Last Name'
                            className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-8 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">Phone Number</label>

                        <input 
                            type='text'
                            placeholder='Enter Phone Number'
                            className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">Gender</label>

                        <select
                            className="w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            >
                            <option value="" disabled>Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <h3 className="font-semibold text-[#3652AD] text-lg">Business details</h3>

                <div className="flex items-center gap-8 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">Business Name</label>

                        <input 
                            type='text'
                            placeholder='Enter Business Name'
                            className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                            value={businessName}
                            onChange={e => setBusinessName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">Address</label>

                        <input 
                            type='text'
                            placeholder='Enter Address'
                            className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-8 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">City</label>

                        <input 
                            type='text'
                            placeholder='Enter City'
                            className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">State</label>

                        <input 
                            type='text'
                            placeholder='Enter State'
                            className='w-full h-12 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-end gap-8 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-normal text-sm text-[#000000]">About</label>

                        <textarea
                            placeholder='This will be displayed on your profile'
                            className='w-full h-20 px-3 border border-[#D3D3D3] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black rounded-lg'
                            value={About}
                            onChange={e => setAbout(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-8 w-full h-11 justify-end">
                        <button onClick={()=>navigate(-1)} className="border border-[#3652AD] rounded-full px-5 text-[#3652AD]">Cancel</button>
                        <button onClick={handleSave} className="bg-[#3652AD] rounded-full px-5">
                            {isEditing ? 
                            <LoadingSpinner size='size-5'/> :
                            <p className="text-[#FEFEFF]">Save Changes</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser