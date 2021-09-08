import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface HandleEditTextProps {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    };

    const taskAlreadyExists = tasks.find(task => task.title === newTask.title);

    if (taskAlreadyExists) {
      return Alert.alert("Task já cadastrada", 'Você não pode cadastrar uma task com o mesmo nome');
    }

    return setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover todo", `Tem certeza que você deseja remover esse todo?`, [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          setTasks(tasks.filter(task => task.id !== id));
        }
      }]
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: HandleEditTextProps) {
    const newTasks = tasks.map(task => task.id === taskId ? { ...task, title: taskNewTitle } : task);
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})