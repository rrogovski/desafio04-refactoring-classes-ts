import { FiEdit3, FiTrash } from 'react-icons/fi';

import { FoodType } from "../../types";

import { Container } from './styles';
import { useFoods } from '../../hooks/useFoods';

interface FoodProps {
  food: FoodType;
  handleDelete: (foodId: number) => void;
  handleEditFood: (food: FoodType) => void;
}

export function Food({ food, handleDelete, handleEditFood }: FoodProps) {
  const { toggleAvailableFood } = useFoods();

  async function toggleAvailable() {
    await toggleAvailableFood(food);
  }

  function setEditingFood() {
    handleEditFood(food);
  }

  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};
