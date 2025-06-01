import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: task, completed: false },
    ]);
    setTask('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTaskCompleted = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View className="flex-1 bg-white p-6 pt-12">
      <StatusBar style="dark" />
      <Text className="text-2xl font-bold mb-4">Witaj Olu!</Text>

      <View className="flex flex-row justify-center items-center w-full">
        <Image
          source={require('../../assets/images/Animation.gif')}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <View className="flex-row mb-4">
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Dodaj nowe zadanie"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2"
        />
        <TouchableOpacity
          onPress={addTask}
          className="bg-yellow-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-bold">Dodaj</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTaskCompleted(item.id)}>
            <View className="flex-row items-center justify-between bg-gray-100 px-4 py-3 rounded-lg mb-2">
              <Text
                className={`flex-1 ${
                  item.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text className="text-red-500 font-bold ml-4">Usuń</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
