import { useState } from 'react';

import { FoodType } from "../../types";

import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFoods';

export function Dashboard() {
  const { foods, addFood, updateFood, deleteFood } = useFoods();
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ modalEditIsOpen, setModalEditIsOpen ] = useState(false);
  const [ editingFood, setEditingFood ] = useState<FoodType>({} as FoodType);

  function handleAddFood(food: FoodType) {
    addFood(food).then(() => toggleModal());
  }

  function handleUpdateFood(food: FoodType) {
    updateFood(food).then(() => toggleEditModal());
  }

  function handleDeleteFood(foodId: number) {
    deleteFood(foodId);
  }

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function toggleEditModal() {
    setModalEditIsOpen(!modalEditIsOpen);
  }

  function handleEditFood(food: FoodType) {
    setEditingFood(food);
    setModalEditIsOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalIsOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={modalEditIsOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
