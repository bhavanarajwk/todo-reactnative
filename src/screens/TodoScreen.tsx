import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../api/todoApi';

export default function TodoScreen() {
  const { data, isLoading, error, refetch } = useGetTodosQuery(null);

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [text, setText] = useState('');

  const handleAdd = async () => {
    if (!text) return;

    await addTodo({
      title: text,
      completed: false,
      userId: 1,
    });

    setText('');
    refetch(); // ⭐ FORCE REFRESH
  };

  const handleUpdate = async (item) => {
    await updateTodo({
      id: item.id,
      title: item.title + ' Updated',
      completed: !item.completed,
    });

    refetch();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    refetch();
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading todos</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Todo"
        value={text}
        onChangeText={setText}
      />

      <Button title="Add Todo" onPress={handleAdd} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => handleUpdate(item)}
              >
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  todoItem: {
    padding: 12,
    borderWidth: 1,
    marginVertical: 6,
    borderRadius: 6,
  },
  row: { flexDirection: 'row', marginTop: 10 },
  updateBtn: {
    backgroundColor: 'orange',
    padding: 8,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: 'red',
    padding: 8,
  },
  btnText: { color: 'white' },
});
