import React, {useState} from 'react'
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import Task from './components/Task';

export default function App(){
  {/*states for element search */}
  const [searchItem, setSearchItem] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setmasterDataSource] = useState([]);
  
  {/* function to handle the search filter task */}
  const handleSearchTask = (text) =>{
    if(text){
      const newData = masterDataSource.filter(
        function (item){
          const itemData = item.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearchItem(text);
    }else{
      setFilteredDataSource(masterDataSource);
      setSearchItem(text);
    }    
  };

  {/* function to add random string to the array on click */}
  const handleAddTask = () => {
    let randomString = " ";
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for(let i=0;i<5;i++){
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setmasterDataSource([...masterDataSource, randomString]);
    setFilteredDataSource([...filteredDataSource, randomString]);
  }

  return (
    <View style={styles.container}>
      
      {/* render searchBar and addButton */}
      <View style={styles.searchContainer}>
        <View style={styles.writeSearchWrapper}> 
          <TextInput placeholder={"search"} style={styles.searchInput} onChangeText={text => handleSearchTask(text)} value={searchItem} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
          </View>
      </View>
      
      {/* render the list of items on the screen */}
      <View style={styles.taskWrapper}>
        <ScrollView>
        <View style={styles.tasks}>
          {
            filteredDataSource.map((item, index) => {
              return <Task key={index} text={item}/>
            })
          }
        </View>
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#E8EAED",
    paddingTop: 20,
  },
  searchContainer:{
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0",
  },
  writeSearchWrapper:{
    width: "100%",
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems: "center",
  },
  searchInput:{
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 60,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 20,
    width: 300,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText:{
    fontSize: 40,
  },
  taskWrapper:{
    paddingHorizontal:20,
  },
  tasks:{
    marginTop: 20,
    paddingBottom: 120,
  },

});