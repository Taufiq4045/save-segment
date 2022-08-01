import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { Header } from '../globalStyles';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Background = styled.div`
  width: 100%;
  margin-top: -6rem;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: right;
`;

const ModalWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 5rem;
  align-items: left;
  line-height: 1.8;
  color: #141414;
  input {
      height: 3rem;
      padding-left: 1rem;
      
  }
  p {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  p:nth-child(4) {
    text-align: right;
  }
  a {
      margin-top: 1rem;
      color: #39B090;
      font-size: 15px;
      font-weight: 800;
      margin-left: 3rem;
      text-decoration: none;
      padding-bottom: 0.5px;
      border-bottom-style: solid;
      width: fit-content;
  }
`;

const SelectContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  div:nth-of-type(2) {
      min-width: 200px;
  }
  span {
      width: 0;
  }
  svg {
      margin-left: 10rem;
  }
`;

const Green = styled.span`
  padding: 1px 9px;
  background: #64AF83;
  border-radius: 50%;
`;

const Red = styled.span`
  padding: 1px 9px;
  background: #E77B56;
  border-radius: 50%;
`;

const Gray = styled.span`
  padding: 1px 9px;
  background: #E8E5E4;
  border-radius: 50%;
`;

const Footer = styled.div`
  position: fixed;
  left: 0;
  height: 5.5rem;
  bottom: 0;
  width: 100%;
  background-color: #E9E9E9;
  color: white;
  button {
    min-width: 100px;
    margin: 24px 20px;
    padding: 12px 16px;
    border-radius: 4px;
    border: none;
    background: #141414;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
  }
  button:first-child {
      background-color: #157A76;
  }
  button:nth-child(2) {
      color: red;
      background-color: white;
  }
`;


export const Modal = ({ showModal, setShowModal }) => {

    const defaultValues = {
        first_name: "First Name",
        last_name: "last Name",
        gender: "Gender",
        age: "Age",
        account_name: "Account Name",
        city: "City",
        state: "State"
      };    

    const [selectedItemList, setSelectedItemList] = useState([]);
    const [currentSelectValue, setCurrentSelectValue] = useState();
    const [showhide, setShowhide]=useState([]);
    const [ resets, setResets ] = useState([{ value: '', label: 'Add schema to segment' }]);
    const { handleSubmit, register, reset } = useForm({defaultValues});

 const options = [
    { value: '', label: 'Add schema to segment' },
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'gender', label: 'Gender' },
    { value: 'age', label: 'Age' },
    { value: 'account_name', label: 'Account Name' },
    { value: 'city', label: 'City' },
    { value: 'state', label: 'State' },
  ]

  

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateX(0%)` : `translateX(100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
        reset();
      setShowModal(false);
      window.location.reload()
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

const handleshowhide=(event)=>{
    setResets(event);
    const getuser = event;
    setCurrentSelectValue(getuser.value);
   }

   const changehandle = (e) =>{
    setSelectedItemList((selecteds) => selecteds.concat(e.value));
   }

   let newOptions = options.filter((option) => {
       return !selectedItemList?.includes(option.value);
   })

  const handleNew = () => {
    if (currentSelectValue) {
      setSelectedItemList((selecteds) => selecteds.concat(currentSelectValue));
      setShowhide((select) => select.concat(currentSelectValue));
      setCurrentSelectValue(null);
    }
    setResets([{ value: '', label: 'Add schema to segment' }]);
  };

  const onSubmit = data => {


     const body = {
             "segment_name": data.segment_name,
             "schema" : [
                 {"first_name": data.first_name},
                 {"last_name": data.last_name},
                 {"gender": data.gender},
                 {"age": data.age},
                 {"account_name": data.gender},
                 {"gender": data.gender},
                 {"gender": data.gender},
             ]
            };

            console.log(body);

axios.post('https://webhook.site/9a9e4908-e68f-4df0-89c8-c1b6d66f6b8a', body)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
          <Header><i></i><h4>Saving Segment</h4></Header>
            <ModalWrapper showModal={showModal}>
                <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
              <ModalContent>
                <p>Enter the Name of the Segment</p>
                <input type="text" {...register("segment_name")} placeholder='Name of the segment'></input>
                <p>To save your segment, you need to add the schemas to build the query</p>
                <p><Green />&nbsp;- User Traits &nbsp;&nbsp;<Red /> - Group Traits</p>    
                
                {/* Row sub-fields of First Name */}
                { showhide.includes('first_name') && (
                    <SelectContent>
                        <div><Green /></div>
                        <div><Select {...register("first_name")} defaultValue={options[1]} onChange={changehandle}  options={newOptions} /></div>
                    </SelectContent>
                )}

                {/* Row sub-fields of Last Name */}
                { showhide.includes('last_name') && (
                    <SelectContent>
                        <div><Green /></div>
                        <div><Select {...register("last_name")} defaultValue={options[2]} onChange={changehandle} options={newOptions} /></div>
                    </SelectContent>
                )}

                {/* Row sub-fields of Gender */}
                { showhide.includes('gender') && (
                    <SelectContent>
                        <div><Green /></div>
                        <div><Select {...register("gender")} defaultValue={options[3]} onChange={changehandle} options={newOptions} /></div>
                    </SelectContent>
                )}

                {/* Row sub-fields of Age */}
                { showhide.includes('age') && (
                    <SelectContent>
                        <div><Green /></div>
                        <div><Select {...register("age")} defaultValue={options[4]} onChange={changehandle} options={newOptions} /></div>
                    </SelectContent>
                )}

                {/* Row sub-fields of Account Name */}
                { showhide.includes('account_name') && (
                    <SelectContent>
                        <div><Red /></div>
                        <div><Select {...register("account_name")} defaultValue={options[5]} onChange={changehandle} options={newOptions} /></div>
                    </SelectContent>
                )}

                {/* Row sub-fields of City */}
                { showhide.includes('city') && (
                    <SelectContent>
                        <div><Green /></div>
                        <div><Select {...register("city")} defaultValue={options[6]} onChange={changehandle} options={newOptions} /></div>
                    </SelectContent>
                )}

                {/* Row sub-fields of State */}
                { showhide.includes('state') && (
                    <SelectContent>
                        <div><Green /></div>
                        <div><Select {...register("state")} defaultValue={options[7]} onChange={changehandle} options={newOptions} /></div>
                    </SelectContent>
                )}     

                {/* Row sub-fields of form */}
                <SelectContent>
                    <div><Gray /></div>
                    <div><Select value={resets} onChange={handleshowhide} options={newOptions} /></div>
                </SelectContent>
                <a href='/#' onClick={handleNew}>+ Add new schema</a>
              </ModalContent>
              </form>
            </ModalWrapper>
            <Footer>
                <button type='submit' form="hook-form">Save the Segment</button>
                <button onClick={() => setShowModal(prev => !prev)}>Cancel</button>
            </Footer>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};