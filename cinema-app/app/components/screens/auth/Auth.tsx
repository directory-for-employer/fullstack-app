import { Button, Loader } from "@/components/ui"
import { IAuthFormData } from "@/shared/types/auth.interface"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Text, View, Pressable } from "react-native"
function Auth() {
  const [isReg, setIsReg] = useState(false)
  
  const {handleSubmit, reset, control} = useForm<IAuthFormData>({
    mode: 'onChange'
  })

  const onSubmit:SubmitHandler<IAuthFormData> = ({email, password}) => {
  }

  const isLoading = false

  return (
    <View className="mx-2 item-center justify-center h-full">
      <View className="w-full">
        <Text className="text-center text-white text-4xl font-bold mb-2.5">
          {isReg ? 'Register' : 'Login'}
        </Text>
        {isLoading ? (<Loader/>
        ) : (
          <>
          <Button onPress={handleSubmit(onSubmit)} icon={'film'}>
            Go to watch
          </Button>
          <Pressable onPress={() => setIsReg(!isReg)}>
            <Text className='text-white opacity-30 text-right text-base mt-5 mr-8'>
              {isReg ? 'Login' : 'Register'}
            </Text>
          </Pressable>
          </>
        )
      }
        
      </View>
    </View>
  )
}

export default Auth