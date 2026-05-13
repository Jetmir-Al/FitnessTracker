import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AchievementProps {
    visible: boolean;
    title: string;
    description: string;
    onClose: () => void;
}

export const AchievementModal = ({ visible, title, description, onClose }: AchievementProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/80 px-6">
                <View className="bg-surface-800 border-2 border-primary p-8 rounded-3xl items-center w-full">
                    <View className="bg-primary/20 p-5 rounded-full mb-4">
                        <Ionicons name="trophy" size={60} color="#CCFF00" />
                    </View>

                    <Text className="text-primary font-heading text-2xl text-center mb-2">
                        {title}
                    </Text>

                    <Text className="text-surface-100 font-body text-center mb-8 text-lg">
                        {description}
                    </Text>

                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-primary py-4 px-10 rounded-full"
                    >
                        <Text className="text-secondary font-heading text-lg">LETS GO!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};