import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { db, storage, RECIPES_REF } from '../../firebase/Config'
import { ref, getDownloadURL } from 'firebase/storage'
import NumericInput from 'react-native-numeric-input'
import SelectDropdown from 'react-native-select-dropdown'
import Entypo from '@expo/vector-icons/Entypo'
import { AntDesign } from '@expo/vector-icons'
import { TextInput, TouchableOpacity, Pressable, Modal } from 'react-native'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { defaultStyle } from '../../styles/styles.js'
import placeholder from '../../img/logo.png'

export const RecipeItemUpdate = ({
  recipeItem: {
    recipename: recipeName,
    instructions: instructions,
    categories: categories,
    ingredients: ingredients,
    id: id
  }
}) => {
  const [recipeNameUpdate, setRecipeNameUpdate] = useState(recipeName)
  const [instructionsUpdate, setInstructionsUpdate] = useState(instructions)
  const [ingredient, setIngredient] = useState('')
  const [ingredientsUpdate, setIngredients] = useState([])
  const [category, setCategory] = useState('')
  const [categoriesUpdate, setCategories] = useState([])

  const [imageUrl, setImageURL] = useState(null)

  const [amount, setAmount] = useState(0)
  const unit = ['ml', 'cl', 'dl', 'l', 'mg', 'g', 'kg', 'tl', 'rl']
  const [selectedUnit, setSelectedUnit] = useState('ml')

  const ingredientList = ingredients.map((ingredient, index) => (
    <Text key={index}>{ingredient}</Text>
  ))

  const ingredientListUpdate = ingredientsUpdate.map((ingredient, index) => (
    <Text key={index}>{ingredient}</Text>
  ))

  const categoryListUpdate = categoriesUpdate.map((category, index) => (
    <Text key={index}>{category}</Text>
  ))

  const categoryList = categories.map((category, index) => (
    <Text key={index}>{category}</Text>
  ))

  const remove = () => {
    deleteDoc(doc(db, RECIPES_REF, id))
    console.log('pressed', id)
  }

  const update = () => {
    addCategory()
    addIngredient()
    // submit data
    updateDoc(doc(db, RECIPES_REF, id), {
      recipename: recipeNameUpdate,
      instructions: instructionsUpdate,
      categories: categoriesUpdate,
      ingredients: ingredientsUpdate
    })
      .then(() => {
        //data saved
        console.log('data submitted')
      })
      .catch(error => {
        //fail
        console.log(error)
      })
    setModalVisible(!modalVisible)
  }

  const addIngredient = () => {
    if (ingredient != "") {
        ingredientsUpdate.push(amount + " " + selectedUnit + " " + ingredient)
        setIngredient("")
    }
  }

  const addCategory = () => {
    if (category != "") {
        categoriesUpdate.push(category)
        setCategory("")
    }
  }

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    getDownloadURL(ref(storage, recipeName + '.jpg')).then(url => {
      setImageURL(url)
      console.log(url)
    })
  }, [])

  

  return (
    <ScrollView style={defaultStyle.recipeItem}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View>
          <ScrollView style={defaultStyle.modalView}>
            {/* kuva ja nimi vierekkäin */}
            <View style={[{ flexDirection: 'row' }]}>
              {/* reseptin nimi */}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  marginLeft: -8,
                  marginRight: 12
                }}
              >
                <TextInput
                  value={recipeNameUpdate}
                  onChangeText={recipeNameUpdate => {
                    setRecipeNameUpdate(recipeNameUpdate)
                  }}
                  placeholder=' Reseptin nimi'
                  style={defaultStyle.textInput}
                ></TextInput>
              </View>
            </View>
            {/* ainesosien lisäys */}
            <View style={defaultStyle.recipeContainer}>
              <View style={[{ flexDirection: 'row' }]}>
                {/* reseptin nimi */}
                <TextInput
                  value={ingredient}
                  onChangeText={ingredient => {
                    setIngredient(ingredient)
                  }}
                  placeholder=' Ainesosa'
                  style={[defaultStyle.textInput, { flex: 4 }]}
                ></TextInput>
                <View style={{ flex: 2 }}>
                  <NumericInput
                    value={amount}
                    totalWidth={60}
                    totalHeight={50}
                    type='up-down'
                    onChange={amount => setAmount(amount)}
                    minValue={0}
                    rounded
                    style={{ width: 6 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <SelectDropdown
                    data={unit}
                    defaultValueByIndex={0}
                    buttonStyle={{ width: 60 }}
                    buttonTextStyle={{ textAlign: 'center' }}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                      setSelectedUnit(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected

                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item
                    }}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TouchableOpacity activeOpacity={0.6} onPress={addIngredient}>
                    <Entypo name={'circle-with-plus'} size={32} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {ingredientsUpdate.map((ingredients, index) => (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        paddingLeft: 12,
                        paddingTop: 8,
                        borderBottomWidth: 2
                      }
                    ]}
                  >
                    <Text key={index}>{ingredients}</Text>
                    <Pressable>
                      <Entypo
                        name={'circle-with-cross'}
                        size={32} /* onPress={removeIngredient} */
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

            {/* kategorioiden lisäys lisäys */}
            <View style={defaultStyle.recipeContainer}>
              <View style={[{ flexDirection: 'row' }]}>
                <TextInput
                  value={category}
                  onChangeText={category => {
                    setCategory(category)
                  }}
                  placeholder=' Kategoria'
                  style={[defaultStyle.textInput, { flex: 1 }]}
                ></TextInput>

                <TouchableOpacity
                  style={defaultStyle.recipeButton}
                  activeOpacity={0.6}
                  onPress={addCategory}
                >
                  <Text style={defaultStyle.buttonText}>Add category</Text>
                </TouchableOpacity>
              </View>

              {/* näyttää valitut kategoriat */}
              <View>
                {categoriesUpdate.map((category, index) => (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        paddingLeft: 12,
                        paddingTop: 8,
                        borderBottomWidth: 2
                      }
                    ]}
                  >
                    <Text key={index}>{category}</Text>
                    <Pressable>
                      <Entypo
                        name={'circle-with-cross'}
                        size={32} /* onPress={removeIngredient} */
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

            {/* reseptin ohje */}
            <TextInput
              value={instructions}
              multiline={true}
              onChangeText={instructions => {
                setInstructionsUpdate(instructions)
              }}
              placeholder=' Ohje'
              style={[
                defaultStyle.textInput,
                {
                  height: 160,
                  marginLeft: 12,
                  marginRight: 12,
                  marginTop: 12,
                  marginBottom: 12
                }
              ]}
            ></TextInput>

            {/* ok ja cancel napit */}
            <View
              style={[
                defaultStyle.recipeContainerI,
                { flexDirection: 'row', marginBottom: 12 }
              ]}
            >
              {/* peruuta */}
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                  }
                ]}
                activeOpacity={0.6}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Entypo
                  name={'circle-with-cross'}
                  size={68}
                  color='red' /* onPress={removeIngredient} */
                />
              </TouchableOpacity>

              {/* lähetä resepti */}
              <TouchableOpacity
                style={[{ flex: 1, alignItems: 'center' }]}
                activeOpacity={0.6}
              >
                <AntDesign name='checkcircle' size={64} color='green' onPress={update}/>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <View>
        <Text style={defaultStyle.recipeTitle}>{recipeName}</Text>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl } || { placeholder }}
            //väliaikanen style, ei näkynyt ilman mitään styleä
            style={{ width: 400, height: 400, margin: 16 }}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>Ei kuvaa saatavilla</Text>
        )}
        <Text />
        <Text>Ohjeet:</Text>
        <Text>{instructions}</Text>
        <Text />
        <Text>Kategoriat:</Text>
        <ScrollView>{categoryList}</ScrollView>
        <Text />
        <Text>Ainesosat:</Text>
        <ScrollView>{ingredientList}</ScrollView>
        <Pressable>
          <Entypo name={'trash'} size={32} onPress={remove} />
        </Pressable>
        <Pressable>
          <AntDesign
            name='setting'
            size={32}
            color='black'
            onPress={() => setModalVisible(true)}
          />
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default RecipeItemUpdate
