import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
 
  SafeAreaView,
 
  StyleSheet,
 
  FlatList,
  StatusBar,
} from "react-native";


import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header/Header";
import * as DocumentPicker from "expo-document-picker";
import { auth, db, storage} from "../../../backend/firebaseConfig";

const UploadFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [docId, setDocId] = useState("");
  const [newDocumentName, setNewDocumentName] = useState("");
  const [customerId, setCustomerId] = useState("");

  // ---------------------------------------fetch files from database-------------------------------------------
  const fetchUserDetails = async () => {
    
    console.log("called")
   var email = auth.currentUser.email;
    try {
      const querySnapshot = await db
        .collection("Customers")
        .where("email_id", "==", email)
        .get();

      const docs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data().documents;
        setCustomerId(doc.data().customer_id);
        setDocId(doc.id);
        data.forEach((obj) => {
          docs.push(obj);
        });
      });
      setFiles(docs);
      return docs;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        // Fetch the data from Firestore or any other data source
        const fetchedData = await fetchUserDetails();
       

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromFirestore();
  }, []);

  //--------------------------------delete document-----------------------------------------------------
  const deleteDocument = async (index) => {
    try {
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1); // Remove the element at the specified index

      await db.collection("Customers").doc(docId).update({
        documents: updatedFiles,
      });

      setFiles(updatedFiles);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  //-----------------------------------------add new document-----------------------------------------------------
  const handleDocumentSelection = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Modify the type according to your document type
        copyToCacheDirectory: false,
      });

      if (document.type === "success") {
        // Call the uploadDocument function with the selected document URI
        uploadDocument(document.uri, document.name);
      }
    } catch (error) {
      // Handle error during document selection
      console.log("Error selecting document:", error);
    }
  };

  const uploadDocument = async (documentURI, documentName) => {
    try {
      const response = await fetch(documentURI);
      const blob = await response.blob();

      // Upload the document to Firebase Storage
      const storageRef = storage
        .ref()
        .child(`user_profiles/${customerId}/documents/${documentName}`);
      await storageRef.put(blob);

      // Get the download URL of the uploaded document
      const downloadURL = await storageRef.getDownloadURL();

      // Save the download URL to Firestore
      const docRef = db.collection("Customers").doc(docId);
      const newDoc = { doc_name: documentName, doc_img_link: downloadURL };
      // Add the new object to the array field using arrayUnion
      const existingArray = files;
      const newArray = [...existingArray, newDoc];
      docRef
        .update({
          documents: newArray,
        })
        .then(() => {
          fetchUserDetails()
          console.log("Object added to the array successfully");
        })
        .catch((error) => {
          console.error("Error adding object to the array:", error);
        });

      // Document upload successful
      console.log("Document uploaded successfully!");
    } catch (error) {
      // Handle error during document upload
      console.log("Error uploading document:", error);
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
     <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      {/* Back button */}
      <View>
        <Header User={false} />
      </View>
      {/* Page title */}
      <Text style={styles.title}>Upload Files</Text>
      <View style={styles.subContent}>
        {/* input,edit and delete button */}

        <FlatList
          data={files}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.fileContent}>
              <TextInput
                style={styles.textInput}
                placeholder="acdjccy.pdf"
                value={item.doc_name}
                onChangeText={(text) => {
                  setTextInput;
                }}
                editable={isEditable}
              />
              {/* <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  // editDocumentName(index,textInput);
                  setIsEditable(true);
                }}
              >
                <Ionicons name="pencil" size={18} color={"#040152"} />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  deleteDocument(index);
                }}
              >
                <MaterialIcons name="delete" size={18} color={"#040152"} />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.buttonContent}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addFileButton}
            onPress={() => {
              handleDocumentSelection();
            }}
          >
            <Text style={styles.addFileButtonTextButtonText}>Add New File</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor:"#fff"
  },
  title: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "Poppins-Regular",
    lineHeight: 36,
    color: "#040152",
    marginBottom: 30,
    backgroundColor:"#fff"
  },
  subContent: {
    backgroundColor: "#F5F8FF",
    width: "100%",
    //  height: "100%",
    paddingTop: 20,
   // paddingLeft: 20,
  },
  fileContent: {
    // display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent:"center",
    alignSelf:"center",
    // marginBottom: 10,
    paddingTop:30,
   // marginLeft:20
  },
  textInput: {
    width: 260,
    height: 60,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    paddingLeft: 10,
    color:"#040152"
  },
  textInputEditable: {
    borderWidth: 1,
    borderColor: "#040152",

  },
  editButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
   
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    width: 60,
    height: 40,
    backgroundColor: "#808080",
    borderRadius: 9.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Poppins-Regular",
    lineHeight: 24,
    color: "#fff",
  },
  addFileButton: {
    width: 132,
    height: 40,
    backgroundColor: "#DF6476",
    borderRadius: 9.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  addFileButtonText: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Poppins-Regular",
    lineHeight: 24,
    color: "#fff",
  },
});

export default UploadFiles;
