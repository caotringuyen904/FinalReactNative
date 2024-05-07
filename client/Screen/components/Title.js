import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Title = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Top favorite restaurants</Text>
                <TouchableOpacity>
                    <Ionicons name="grid" size={24} color='red'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontFamily: 'sans-serif',
        fontSize: 24
    },

})

export default Title

