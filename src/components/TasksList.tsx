import React from 'react';
import { FlatList, ScrollViewProps } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface EditTextProps {
  taskId: number;
  taskNewTitle: string;
}

interface TasksListProps extends ScrollViewProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (data: EditTextProps) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask, ...rest }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      {...rest}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem toggleTaskDone={toggleTaskDone} removeTask={removeTask} editTask={editTask} index={index} task={item} />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}