/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter/';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState<FilterType>('all');

  const handleSetFilter = (value: FilterType) => {
    setFiltering(value);
  };

  const handleClearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const handleRemoveError = () => {
    setIsError('');
  };

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setIsError('');
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setIsError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!isError) {
      return;
    }

    const timer = setTimeout(() => {
      setIsError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [isError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList todos={todos} isLoader={loading} filterValue={filtering} />
        {todos.length !== 0 && (
          <TodoFooter
            todos={todos}
            filterValue={filtering}
            setFilter={handleSetFilter}
            onClear={handleClearCompleted}
          />
        )}
      </div>
      <ErrorNotification isError={isError} onClose={handleRemoveError} />
    </div>
  );
};
